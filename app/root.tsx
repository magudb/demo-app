import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { deployment } from "../deployment"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

const getVersion = ()=>{
  return deployment.VERSION
}

const getSha = ()=>{
  return deployment.SHA
}

export async function loader({ request }: LoaderArgs) {
  const version = getVersion()
  const sha = getSha();
  const host = process.env.HOSTNAME;
  return json({
    user: await getUser(request),
    version,
    sha,
    host
  });
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <footer>
          <small>{data.host} - {data.version} - {data.sha}</small> 
      </footer>
      </body>
    </html>
  );
}
