function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

$(document).ready(function() {
    $.getJSON("assets/data.json", function(data) {
        var shuffled_data = shuffle(data);
        $.each(shuffled_data, function(key, val) {
            var img = $('<img />', {
                class: 'hex',
                src: val.sticker_url,
                alt: val.alternate
            });

            jQuery('<a />', {
                href: val.link_to,
                target: "_blank",
            }).append(img).appendTo("#grid");
        });

    });
});