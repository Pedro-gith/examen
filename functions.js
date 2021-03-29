var mainData = [];
var total = 0;
$(document).ready(function(){
    fetchData();

    $('#optBTC').change(function(){

        console.log($(this).val());
    });
});

function fetchData(){
    $.getJSON( "criptos.json", function( data ) {
         
        data.criptos.forEach(element => {
            if(element.symbol == 'BTC'){
                $('#BTC').val(element.balance);
            }
            if(element.symbol == 'ETH'){
                $('#ETH').val(element.balance);
            }
            if(element.symbol == 'LTC'){
                $('#LTC').val(element.balance);
            }
            total = total  + (element.balance * element.rateInUSD );
            console.log(total);
        });

        mainData = data.criptos;

        $('#total').val(total);;

    });
}

function getName(){
}

function getSymbol(){
}

function getBalance(){
}

function getURL(){
}

function getRate(symbol){
    let rate = 0;
    mainData.forEach(element => {
        if(element.symbol === symbol){
            rate = element.rateInUSD;
        }
    });

    return rate;
}

function prepareTransfer(){
    let amount  = $('#amount').val();
    let acc1    = $('#acc1').val();
    let acc2    = $('#acc2').val();
    transfer(acc1,acc2,amount);
}

function transfer(acc1,acc2,amount){
    

    let usdAcc1 = getRate(acc1);
    let totalDllsAcc1 = usdAcc1 * amount;
    let usdAcc2 = getRate(acc2);
    let totalBalanceAcc2 = totalDllsAcc1/usdAcc2;
    let newTotal = parseFloat($('#'+acc2).val()) + parseFloat(totalBalanceAcc2);
    $('#'+acc2).val(newTotal);

    let balanceBTC = $('#BTC').val();
    let rateBTC = getRate('BTC');
    let btcTotal = parseFloat(balanceBTC) * parseFloat(rateBTC);

    let balanceETH = $('#ETH').val();
    let rateETH = getRate('ETH');
    let ethTotal = parseFloat(balanceETH) * parseFloat(rateETH);
    
    let balanceLTC = $('#LTC').val();
    let rateLTC = getRate('LTC');
    let ltcTotal = parseFloat(balanceLTC) * parseFloat(rateLTC);


    let newGreateTotal = parseFloat(btcTotal) + parseFloat(ethTotal) + parseFloat(ltcTotal);

    $('#total').val(newGreateTotal);
}