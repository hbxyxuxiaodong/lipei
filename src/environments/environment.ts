// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: {
    walrus: 'https://testgiraffe.99bx.cn:7001/api',
    um: 'https://testum.99bx.cn/api/',
    panda: 'https://testpanda.99bx.cn/api',
    bluewhale: 'https://testbw.99bx.cn',
    claim:'https://testclaim.99bx.cn/api',
    opr:'https://testopr.99bx.cn',
    static:'https://ssl.99bx.cn/static'
  }
};
