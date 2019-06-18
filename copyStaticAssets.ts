import * as shell from "shelljs";

shell.cp("-R", "src/static", "build/src/static");
shell.cp("-R", "src/views", "build/src/views");
