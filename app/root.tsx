import stylesheet from "./styles/tailwind.css";
import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
      <title>An error occured!</title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main>
        <h1>An error occured!</h1>
        <h2>{error.message}</h2>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
