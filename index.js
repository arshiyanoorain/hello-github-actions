Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@arshiyanoorain 
arshiyanoorain
/
githubaction-tasks
2
0
0
Code
Issues
1
Pull requests
Actions
Projects
1
Wiki
Security
11
Insights
Settings
githubaction-tasks/index.js /
@arshiyanoorain
arshiyanoorain nodejs initial commmit
Latest commit f4d5ab4 yesterday
 History
 1 contributor
We found potential security vulnerabilities in your dependencies.
Only the owner of this repository can see this message.

44 lines (39 sloc)  1.03 KB
  
const server = require("server");
const chalk = require("chalk");
const ora = require("ora");

const { error, get } = server.router;
const { render, status } = server.reply;

const { fetchZen } = require("./lib/utils");

const log404 = ctx =>
  console.log(chalk`{red 404}   {green ${ctx.method}}    {bold ${ctx.url}}`);

const getZenQuote = async ctx => {
  const spinner = ora("Fetching Zen message of the day from GitHub").start();
  try {
    ctx.zen = { msg: await fetchZen() };
    // ctx.zen = { msg: await "test" }; // for debugging
    spinner.succeed();
  } catch (e) {
    spinner.fail();
    throw e;
  }
};

server(
  { log: "debug", env: "development" },
  get("/", [
    getZenQuote,
    async ctx => {
      return render("index.pug", { zen: ctx.zen });
    }
  ]),
  // 404s
  get(ctx => {
    log404(ctx);
    return status(404);
  }),
  error(ctx => status(500).send("Error: " + ctx.error.message))
).then(ctx => {
  console.log(chalk`
  {green [ OK ]} Server launched on {bold http://localhost:${
    ctx.options.port
  }/}`);
});
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
