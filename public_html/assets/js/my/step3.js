// Step1 Class definition

var Step3 = function() {

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
        }).on('changeDate', function(e) {
            validator.validate()
        });
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


jQuery(document).ready(function() {

    Step3.init();

    bindData('dosar_an', $('#dosar_nr').val());

    $('#btn-submit').on('click', function(e) {
        e.preventDefault();
        validator.validate().then(function(status) {
            if (status == 'Valid') {
                var form_data = $('#step3_form').serialize();
                var action = $('#step3_form').attr('action');
                $.ajax({
                    url: action,
                    type: "POST",
                    data: form_data,
                    success: function(res) {
                        if (res.status == 200) {
                            showDialog({ text: res.msg });
                            download_files = res.file_list;
                            setTimeout(() => {
                                $('.download').show();
                                // window.location.assign(res.url);
                            }, 2000);
                        } else {
                            showDialog({ text: res.msg, icon: 'warning' });
                        }
                    },
                    error: function() {
                        showDialog({ text: 'Occur errors while sending data!', icon: 'error' });
                    }
                });
            }
        });
    })

    $('#btn-fetch').on('click', function(e) {
        var dosar_nr, dosar_an;
        dosar_nr = $('#dosar_nr').val();
        dosar_an = $('#dosar_an').val();
        $('.download').hide();
        if (dosar_an != "" && dosar_nr != "") {
            $.ajax({
                url: '/api/getproject/' + dosar_nr + "/" + dosar_an,
                type: "GET",
                success: function(res) {
                    var status = 'success';
                    if (res.status == 200) {
                        download_files = res.data.file_list;
                        // if (_isShowDownload(8)) $('.download').show();
                        RenderHtml.init(res.data);
                    } else {
                        status = 'warning';
                    }
                    validator.validate();
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

    $('#btn-download').click(function() {
        var dosar_an, dosar_nr, url;
        dosar_an = $('#dosar_an').val();
        dosar_nr = $('#dosar_nr').val();
        fileDownload(dosar_an, dosar_nr, 3)
    });
});


var RenderHtml = function() {

    var fillForm = function(data) {
        $('input[name=data_eliberare]').val(data.data_eliberare);
        $('input[name=data_recipisa]').val(data.data_recipisa);
        $('input[name=creditor]').val(data.creditor);
        $('input[name=debitor]').val(data.debitor);
        $('input[name=suma_consmnata]').val(data.total_somatie);
        $('input[name=recipisa_nr]').val(data.recipisa_nr);
        $('input[name=suma_creditor]').val(data.suma_creditor);
        $('input[name=op_nr_creditor]').val(data.op_nr_creditor);
        $('input[name=suma_cheltuieli]').val(data.suma_cheltuieli);
        $('input[name=op_nr_cheltuieli]').val(data.op_nr_cheltuieli);
        $('input[name=nr_ff]').val(data.nr_ff);
        $('input[name=data_incetare]').val(data.data_incetare);

        $('input[name=data_eliberare]').val(data.data_eliberare);
        $('input[name=data_recipisa]').val(data.data_recipisa);
        $('input[name=recipisa_nr]').val(data.recipisa_nr);
        $('input[name=op_nr_creditor]').val(data.op_nr_creditor);
        $('input[name=op_nr_cheltuieli]').val(data.op_nr_cheltuieli);
        $('input[name=data_incetare]').val(data.data_incetare);

    }

    return {
        init: function(data) {
            fillForm(data.project);
        }
    }
}();