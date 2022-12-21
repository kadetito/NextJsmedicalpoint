import "../scss/index.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { SSRProvider } from "react-bootstrap";
import { AuthProvider } from "../context";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <SSRProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </LocalizationProvider>
        </SSRProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
