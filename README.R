user <- "kctolli" ## set user

user_stats <- function(){
  pander::pander(glue::glue('<h2>User Stats</h2><div align="center"><img style="max-width:100%;" height="160" align="center"
  src="https://github-readme-stats.vercel.app/api/top-langs/?username={user}&layout=compact&theme=gruvbox" /></div>'))
}