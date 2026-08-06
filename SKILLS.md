# SKILLS.md — Databox

Databox is a local-first computer vision labeling tool. Skills should support
code quality, accessibility, and focused tool UI work rather than SaaS
marketing, SEO, billing, or database workflows.

## Most Useful

| Skill | When to use |
|---|---|
| `a11y-audit` | Check keyboard access, labels, contrast, focus states, and empty states in labeling tools. |
| `shadcn` | Add or adjust Shadcn-style UI primitives while keeping semantic tokens. |
| `design-taste-frontend` | Polish dense app/tool interfaces such as dataset chooser, editor, review, and export screens. |
| `redesign-existing-projects` | Review a completed Databox screen and simplify visual hierarchy. |
| `github-code-review` | Review a branch or pull request before merging cleanup or feature work. |

## Usually Not Relevant

- Marketing, SEO, pricing, paywall, signup, and ad skills.
- Supabase-specific schema/RLS skills for v1.
- SaaS onboarding or churn skills.

## Project Reminder

- No landing page.
- No dashboard shell.
- No public SaaS flow.
- First screen is the dataset chooser.
- Filesystem dataset services live in `src/services/`.
- Shared Databox helpers live in `src/lib/databox/`.
