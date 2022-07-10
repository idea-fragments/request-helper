import babel            from "@rollup/plugin-babel"
import commonjs         from "@rollup/plugin-commonjs"
import resolve          from "@rollup/plugin-node-resolve"
import typescript       from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import dts              from "rollup-plugin-dts"
import json             from "@rollup/plugin-json"

export default [
  {
    input:   `src/index.ts`,
    output:  [
      {
        file:      `dist/index.js`,
        exports:   "named",
        format:    "cjs",
        sourcemap: true,
        strict:    false,
      },
    ],
    plugins: [
      json(),
      peerDepsExternal(),
      typescript({ outputToFilesystem: false, tsconfig: "./tsconfig.json" }),
      commonjs(),
      resolve(),
      babel({ babelHelpers: "bundled" }),
    ],
  },
  {
    input:   "./dist/types/index.d.ts",
    output:  [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: "./dist/types",
        },
      }),
    ],
  },
]
