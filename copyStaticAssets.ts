import * as shell from "shelljs";

shell.cp("-R", "src/static", "build/static");
shell.cp("-R", "src/views", "build/views");
