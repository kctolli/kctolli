library(shiny)

# Define UI ----
ui <- fluidPage(
  titlePanel(),
  
  sidebarLayout(
    sidebarPanel(),
    mainPanel()
  )
)

# Define server logic ----
server <- function(input, output) {
  
}

# Run the app ----
shinyApp(ui = ui, server = server)