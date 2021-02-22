library(shiny)
library(lubridate)

# Define UI for displaying current time ----
ui <- fluidPage(h2("The current time is ", textOutput("currentTime")))

# Define server logic to show current time ----
server <- function(input, output, session) {
  
  output$currentTime <- renderText({
    invalidateLater(1000, session)
    time <- format(Sys.time(), "%d-%m-%Y %I:%M %P")
    paste(time)
  })
  
}

# Create Shiny app ----
shinyApp(ui, server)