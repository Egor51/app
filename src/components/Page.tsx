import { PropsWithChildren } from 'react';

export function Page({ children }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean
}>) {


  return <>{children}</>;
}