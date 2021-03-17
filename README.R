source("https://github.com/kctolli/kctolli.github.io/raw/master/site_libs/site.R")

load_libraries()

user_stats <- function(){pander::pander(glue::glue('
  <h2>User Stats</h2><a href="https://github.com/anuraghazra/github-readme-stats" align="center"><img style="max-width:100%;" height="160" align="center"
  src="https://github-readme-stats.vercel.app/api/top-langs/?username=kctolli&layout=compact&theme=gruvbox" /></a> \n\n\n'))
}