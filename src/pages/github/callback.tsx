import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authClient } from '../../lib/auth-client';

export function GithubCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const projectId = searchParams.get('state');

  useEffect(() => {
    async function finalize() {
      if (code && projectId) {
        try {
          const { data, error } = await authClient.$fetch<{ accessToken: string, repos: any[] }>('http://10.0.0.150:3000/github/callback', {
            method: 'POST',
            body: { code, projectId }
          });

          if (!error && data) {
            // Send message back to opener
            if (window.opener) {
              window.opener.postMessage({
                type: 'GITHUB_AUTH_SUCCESS',
                projectId,
                repos: data.repos,
                accessToken: data.accessToken
              }, window.location.origin);
              window.close();
            } else {
              // fallback if not a popup
              window.location.href = `/?project_id=${projectId}&github_connected=true`;
            }
          } else {
            console.error('GitHub auth failed:', error);
            if (window.opener) {
              window.opener.postMessage({ type: 'GITHUB_AUTH_ERROR', error: 'Authentication failed' }, window.location.origin);
              window.close();
            }
          }
        } catch (e) {
          console.error('GitHub callback error:', e);
        }
      }
    }
    finalize();
  }, [code, projectId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium animate-pulse">Conectando ao GitHub...</p>
    </div>
  );
}
