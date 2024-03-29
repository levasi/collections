module.exports = (function () {
    let channels = {}
    let subscribe = function (channel, fn) {
        if (!channels[channel]) {
            channels[channel] = []
        }
        channels[channel].push({
            context: this,
            callback: fn
        })
        return this
    }
    let publish = function (channel) {
        if (!channels[channel]) {
            return false
        }
        let args = Array.prototype.slice.call(arguments, 1)
        for (let i = 0, l = channels[channel].length; i < l; i++) {
            let subscription = channels[channel][i]
            subscription.callback.apply(subscription.context, args)
        }
        return this
    }
    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function (obj) {
            obj.subscribe = subscribe
            obj.publish = publish;
        }
    };
}())