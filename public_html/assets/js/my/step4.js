"use strict";

var Step4 = function() {

    // Private functions
    var valid = function() {
        // date format
        $("#dosar_an").inputmask("9999", {
            "placeholder": "yyyy",
            autoUnmask: true
        });

        // Datepicker
        $('input[name=data_eliberare], input[name=data_recipisa], input[name=data_incetare]').datepicker({
            todayHighlight: true,
            format: "dd.mm.yyyy",
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        }).on('changeDate', function(e) {});
    }

    var action = function() {

        $("input[name=suma_consmnata]").focusin(function() {
            var value = $(this).val();
            value = getOnlyNumber(value);
            $(this).val(value);
        });

        $("input[name=suma_consmnata]").focusout(function() {
            var value = $(this).val();
            value = convertWithFormat(value);
            if (value != "") {
                $(this).val(value);
            }
        });
    }

    return {
        // public functions
        init: function() {
            valid();
            action();
        }
    };
}();

var KTClipboardDemo = function() {

    // Private functions
    var demos = function() {
        // basic example
        new ClipboardJS('[data-clipboard=true]').on('success', function(e) {
            e.clearSelection();
            toastr.info('Copied data');
        });
    }

    return {
        // public functions
        init: function() {
            demos();
        }
    };
}();


jQuery(document).ready(function() {

    Step4.init();

    KTClipboardDemo.init();

    bindData('dosar_an');

    $('#btn-fetch').on('click', function(e) {
        var dosar_nr, dosar_an;
        dosar_nr = $('#dosar_nr').val();
        dosar_an = $('#dosar_an').val();
        if (dosar_an != "" && dosar_nr != "") {
            $.ajax({
                url: '/api/getproject/' + dosar_nr + "/" + dosar_an,
                type: "GET",
                success: function(res) {
                    var status = 'success';
                    if (res.status == 200) {
                        var project = res.data.project;
                        var creditor = project.creditor;

                        var cheltuieli_judecata = project.cheltuieli_judecata;
                        var debit = project.debit;
                        var total_penalitati = project.total_penalitati_simple;
                        var taxa = project.taxa_timbru;
                        var onorariu_avocat = project.onorariu_avocat;
                        var onorariu = project.onorariu;
                        var cheltuieli = project.cheltuieli_materiale;

                        cheltuieli_judecata = getDefaultNum(cheltuieli_judecata);
                        debit = getDefaultNum(debit);
                        total_penalitati = getDefaultNum(total_penalitati);
                        taxa = getDefaultNum(taxa);
                        onorariu_avocat = getDefaultNum(onorariu_avocat);
                        onorariu = getDefaultNum(onorariu);
                        cheltuieli = getDefaultNum(cheltuieli);

                        var a = cheltuieli_judecata + debit + total_penalitati + taxa + onorariu_avocat;
                        var b = onorariu + cheltuieli;
                        a = convertMoneyFormat(a, 2)
                        b = convertMoneyFormat(b, 2)
                        cheltuieli_judecata = convertMoneyFormat(cheltuieli_judecata)
                        debit = convertMoneyFormat(debit)
                        total_penalitati = convertMoneyFormat(total_penalitati)
                        taxa = convertMoneyFormat(taxa)
                        onorariu_avocat = convertMoneyFormat(onorariu_avocat)

                        var text = creditor + "  " + a + " lei \n" +
                            "CHELTUIELI JUDECATA  " + cheltuieli_judecata + " \n" +
                            "DEBIT  " + debit + "\n" +
                            "PENALITATI  " + total_penalitati + "\n" +
                            "TAXA TIMBRU  " + taxa + " \n" +
                            "ONORARIU AVOCAT  " + onorariu_avocat + " \n" +
                            "DOS EX  " + dosar_nr + "/" + dosar_an + " \n\n" +
                            "BEJ DRAGAN  " + b + " lei \n" +
                            "RECUPERARE CHELTUIELI EXECUTIONALE DOS EX " + dosar_nr + "/" + dosar_an;

                        $('.copy-text').show();
                        $('#kt_clipboard').val(text);

                    } else {
                        status = 'warning';
                        $('.copy-text').hide();
                        $('#kt_clipboard').val("");
                    }
                    showDialog({ text: res.msg, icon: status });
                },
                error: function() {
                    showDialog({ text: 'Occur errors while fetching data!', icon: 'error' });
                }
            });
        } else {
            toastr.info('Please fill the Dosar nr and Dosar an!');
        }
    })
});