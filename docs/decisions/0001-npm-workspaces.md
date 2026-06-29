# Decision: npm workspaces for this scaffold

The brief suggested pnpm workspaces, but `pnpm` is not installed in the current environment. This scaffold uses npm workspaces so the project can be installed and run immediately without requiring a global package-manager change.

If the team standardizes on pnpm later, the workspace layout is already compatible: replace `package-lock.json` with `pnpm-lock.yaml` and update scripts accordingly.
