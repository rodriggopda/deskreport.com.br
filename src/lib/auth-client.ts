import { createAuthClient } from "better-auth/react"
import { organizationClient, adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        adminClient(),
        organizationClient()
    ],
    organization: {
        additionalFields: {
            metadata: {
                type: "string",
                required: false,
            }
        }
    }
})

export const { signIn, signUp, useSession, useActiveOrganization: useOrganization } = authClient;
