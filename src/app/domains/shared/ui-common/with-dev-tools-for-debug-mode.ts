import { environment } from "src/environments/environment.development";

export function withDevToolsForDebugMode(name: string) {
  return environment.withDevTools(name);
}
