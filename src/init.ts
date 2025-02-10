import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from '@telegram-apps/sdk-react';
import TelegramAnalytics from "@telegram-apps/analytics";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Add Eruda if needed.
  debug && import('eruda')
    .then((lib) => lib.default.init())
    .catch(console.error);

  // Check if all required components are supported.
  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  // Mount all components used in the project.
  backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport
    .mount()
    .catch(e => {
      console.error('Something went wrong mounting the viewport', e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  // Define components-related CSS variables.
  miniApp.bindCssVars();
  themeParams.bindCssVars();

  TelegramAnalytics.init({
    token: 'eyJhcHBfbmFtZSI6IkNhcGl0YWwiLCJhcHBfdXJsIjoiaHR0cHMvL3QubWUvbXl0cmFmZmljX2FwcF9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9lZ29yNTEuZ2l0aHViLmlvL21pbmlfYXBwLyJ9!SkxC+0rsBVxr3uGeJg+HUTfpF9rd1SfEVjzca0Rzt5Y=',
    appName: 'Capital',
  });
}