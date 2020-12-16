$(document).ready(function() {


    var chart_config = {
        chart: {
            container: "#treant_tree",

            animateOnInit: true,

            node: {
                collapsable: true
            },
            animation: {
                nodeAnimation: "easeOutBounce",
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
            }
        },
        nodeStructure: {
        text: {name: 'xd'},
        children: [{
        text: {name: 'child'}
        }]
        }
    };

    const tree = new Treant( chart_config );
});
