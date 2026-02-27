import { createAuthClient } from "better-auth/react"
import { organizationClient, adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: "http://10.0.0.150:3000",
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
