import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import { globby } from "globby";

export default [
  {
    input: {
      app: "src/server/app.js",
      router: "src/server/components/router.js",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [babel({ babelHelpers: "bundled", exclude: "node_modules/**" })],
    preserveModules: true,
  },
  {
    input: (await globby("src/client/*.js"))
      .concat(await globby("src/client/components/*.js"))
      .reduce(
        (acc, entryFile) => ({
          ...acc,
          [entryFile.replace(".js", "")]: entryFile,
        }),
        {}
      ),
    output: {
      dir: "public",
      format: "es",
      entryFileNames: "[name].js",
    },
    plugins: [
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      peerDepsExternal(),
      commonjs(),
      nodeResolve(),
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
    preserveModules: true,
  },
];
