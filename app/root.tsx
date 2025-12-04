import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { LeftNavBarExample } from "~/components/left-nav-bar/left-nav-bar-example";
import { PageContainer } from "~/components/page-container/page-container";
import { ThemeProvider } from "~/utils/theme-context";

/**
 * External resource links (fonts, etc.)
 */
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

/**
 * Main layout content with navigation and page container
 */
function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftNavBarExample />
      <div className="flex-1 ml-[76px]">
        <PageContainer>
          <div className="flex-1">
            {children}
          </div>
        </PageContainer>
      </div>
    </>
  );
}

/**
 * Root layout component
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex">
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Main app component
 */
export default function App() {
  return <Outlet />;
}

/**
 * Error boundary component for route errors
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-theme-primary">{message}</h1>
      <p className="text-theme-secondary">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-theme-muted text-theme-primary rounded-lg">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
