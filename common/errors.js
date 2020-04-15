
const messages = {
    http:  [
        [404, "Okay Boomer, you're lost, welcome to the internet. I'll be your guide.. "],
        [200, 'Ossum']
    ]
};

module.exports = {
    report: (response) => {
        //TODO:  Javascript is mental to allow this
        return messages.http[Object.keys(messages.http[0]).filter((code) => {
            return messages.http[code][0] == response;
        })];
        // Because we all love how perl and php was magic too
        // Pure debauchery. Love it.
    }
}