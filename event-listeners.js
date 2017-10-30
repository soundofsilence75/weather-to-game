const EventListeners = {
    listenersStarted: false,
    searchQuery: "",

    startListeners: function() {
        if (!this.listenersStarted) {
            this.handleSubmit();
            this.handleHeaderLinkClicked();
            
            this.listenersStarted = true;
        }
    },

    handleHeaderLinkClicked: function() {
        $(".header__link").click(function(event) {
            App.reset();
        });
    },

    handleSubmit: function() {
        $(".intro__form").submit(function(event) {
            event.preventDefault();
            const queryTarget = $(this).find(".intro__query");
            this.searchQuery = queryTarget.val();

            App.dayIndex = 0;
            App.searchWeather(this.searchQuery);
            EventListeners.handleExtendedForecastLinkClicked(this.searchQuery);
            EventListeners.handleExtendedForecastDayClicked(this.searchQuery);
            queryTarget.val("");
        });
    },

    handleExtendedForecastLinkClicked: function(query) {
        $(".day-forecast").on("click", ".extended-forecast__link",(event) => {
            HTMLRenderer.showSection(".extended-forecast");
            console.log(query);
            App.searchWeatherExtended(query);
        });
    },

    handleExtendedForecastDayClicked: function(query) {
        console.log("listener started");
        $(".extended-forecast").on("click", ".extended-forecast-day__link", function(event) {
            console.log("day clicked");
            App.dayIndex = $(this).attr("data-index");
            App.searchWeather(query);
        });
    }
};