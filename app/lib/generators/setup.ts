import type { BuilderConfig } from "../builder-config";

export function generateSetupInstructions(config: BuilderConfig) {
  return `# ${config.formSettings.pageName}

## Framer Setup
1. Copy the generated JSX into a Framer code component.
2. Paste the component on your page and configure the property controls.
3. Any integration enabled in the dashboard appears in Framer as an input field only.

## Integrations
- OTP: generated only when enabled in the dashboard
- Google Sheets: generated only when enabled in the dashboard
- Full Data Webhook: generated only when enabled in the dashboard
- Redirect: generated only when enabled in the dashboard

## Form Model
- Fields: ${config.fields.map((field) => field.label).join(", ")}
- Desktop Layout: ${config.styling.layout}
- Tablet Layout: ${config.styling.tabletLayout ?? config.styling.layout}
- Mobile Layout: ${config.styling.mobileLayout ?? config.styling.layout}
- Button: ${config.formSettings.buttonText}`;
}
