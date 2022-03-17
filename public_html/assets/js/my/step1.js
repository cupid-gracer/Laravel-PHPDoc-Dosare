// Step1 Class definition

// const { forEach } = require("lodash");

var Step1 = function() {

    // Private functions
    var valid = function() {
        // date format
        $("#dosar_an").inputmask("9999", {
            // "placeholder": "yyyy",
            autoUnmask: true
        });

        // Datepicker
        $('input[name=data_deschidere], .dela, .pana-editable').datepicker({
            todayHighlight: true,
            format: "dd.mm.yyyy",
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });

    }

    var action = function() {
        $('.btn-del-pen').click(function() {
            $(this).parent().parent().parent().remove();
        });

        $("input[name=cheltuieli_judecata]").focusout(function() {
            var value = $(this).val();
            value = convertWithFormat(value);
            if (value != "") {
                value += " lei, reprezentând cheltuieli de judecată";
                $(this).val(value);
            }
        });

        $("input[name=cheltuieli_judecata], input[name=debit]").focusin(function() {
            var value = $(this).val();
            value = getOnlyNumber(value, 'lei');
            $(this).val(value);
        });

        $("input[name=debit]").focusout(function() {
            var value = $(this).val();
            value = convertWithFormat(value);
            if (value != "") {
                value += " lei, reprezentând debit";
                $(this).val(value);
            }
        });


        $("input[name=taxa_timbru], .penalitati_simple, .asupra-editable, .pro").focusout(function() {
            var value = $(this).val();
            value = convertWithFormat(value);
            if (value != "") {
                $(this).val(value);
            }
        });

        $("input[name=taxa_timbru], .penalitati_simple, .asupra-editable, .pro").focusin(function() {
            var value = $(this).val();
            value = getOnlyNumber(value, 'lei');
            $(this).val(value);
        });

        $('input[name=debit]').on('input', function() {
            var value = $(this).val()
            $('.asupra').each(function() {
                if ($(this).attr('readonly') == "readonly") {
                    $(this).val(convertWithFormat(value));
                }
            });
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


var RenderHtml = function() {

    var fillForm = function(data) {
        $('input[name=data_deschidere]').val(data.data_deschidere);
        $('input[name=instanta]').val(data.instanta);
        $('input[name=adresa_instanta]').val(data.adresa_instanta);
        $('input[name=creditor]').val(data.creditor);
        $('input[name=adresa_creditor]').val(data.adresa_creditor);
        $('input[name=debitor]').val(data.debitor);
        $('input[name=adresa_debitor]').val(data.adresa_debitor);
        $('input[name=cui]').val(data.cui);
        $('input[name=titlul_executoriu]').val(data.titlul_executoriu);
        $('input[name=inscrisuri]').val(data.inscrisuri);
        $('input[name=format_titlu_executoriu]').val(data.format_titlu_executoriu);
        $('input[name=cheltuieli_judecata]').val(data.cheltuieli_judecata);
        $('input[name=debit]').val(data.debit);
        $('input[name=taxa_timbru]').val(data.taxa_timbru);
    }

    var renderPenaComponent = function(data) {
        var html = "";
        data.forEach(pena => {
            switch (pena.type) {
                case 1:
                    procent_is_readonly = true;
                    asupra_is_editable = false;
                    pana_is_editable = false;
                    break;
                case 2:
                    procent_is_readonly = true;
                    asupra_is_editable = true;
                    pana_is_editable = true;
                    break;
                case 3:
                    procent_is_readonly = false;
                    asupra_is_editable = true;
                    pana_is_editable = true;
                    break;
                default:
                    procent_is_readonly = false;
                    asupra_is_editable = true;
                    pana_is_editable = true;
                    break;
            }

            var template = `<div class="form-group row pen-item">
                                <input type="hidden" name="penas[type][]" value="${pena.type}">
                                <input type="hidden" name="penas[id][]" value="${pena.id}">
                                <input type="hidden" name="penas[penalitati_simple][]">
                                <div class="col-11 row">
                                    <div class="col-md-3 col-sm-6">
                                        <label>PROCENT/zi:</label>
                                        <input type="text" class="form-control pro" name="penas[procent_zi][]" value="${pena.procent_zi}" placeholder="Enter PROCENT/zi" ${procent_is_readonly?'readonly':''}/>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <label>ASUPRA:</label>
                                        <input type="text" class="form-control asupra ${asupra_is_editable?'asupra-editable':''} " name="penas[asupra][]" value="${pena.asupra}" placeholder="Enter ASUPRA" ${asupra_is_editable?'':'readonly'}/>
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <label>DELA:</label>
                                        <input type="text" class="form-control dela" name="penas[dela][]" value="${pena.dela}" placeholder="Enter DELA" />
                                    </div>
                                    <div class="col-md-3 col-sm-6">
                                        <label>PANA LA:</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control pana ${pana_is_editable?'pana-editable':''}" name="penas[pana_la][]" value="${pena.pana_la}" placeholder="Enter PANA LA"${pana_is_editable?'':'readonly'} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <label>DELETE:</label>
                                    <div class="input-group">
                                        <a class="btn btn-del-pen"><i class="fas fa-trash-alt icon-md" style="color: crimson"></i></a>
                                    </div>
                                </div>
                            </div>`;

            if (pena.type == 4) {
                template = `
                        <div class="row">
                            <input type="hidden" name="penas[type][]" value="${pena.type}">
                            <input type="hidden" name="penas[id][]" value="${pena.id}">
                            <input type="hidden" name="penas[procent_zi][]">
                            <input type="hidden" name="penas[asupra][]">
                            <input type="hidden" name="penas[dela][]">
                            <input type="hidden" name="penas[pana_la][]">
                            <input type="hidden" name="penas[zile][]">
                            <input type="hidden" name="penas[suma][]">
                            <div class="form-group row col-11">
                                <div class="col-md-2 col-sm-6">
                                    <label>PENALITATI SIMPLE:</label>
                                    <input type="text" class="form-control penalitati_simple" name="penas[penalitati_simple][]" placeholder="Enter Simple" value="${pena.penalitati_simple}"/>
                                </div>
                            </div>
                            
                            <div class="col-1">
                                <label>DELETE:</label>
                                <div class="input-group">
                                    <a class="btn btn-del-pen"><i class="fas fa-trash-alt icon-md" style="color: crimson"></i></a>
                                </div>
                            </div>
                        </div>
                `
            }
            html += template;
        });

        $('.pena-items').html(html);
        Step1.init();

    }

    return {
        init: function(data) {
            fillForm(data.project);
            renderPenaComponent(data.penas);
        }
    }
}();


jQuery(document).ready(function() {

    Step1.init();

    bindData('dosar_an', $('#dosar_nr').val());
    bindData('instanta');
    bindData('adresa_instanta');
    bindData('creditor');
    bindData('adresa_creditor');
    bindData('debitor');
    bindData('adresa_debitor');
    bindData('cui');
    bindData('format_titlu_executoriu');
    bindData('titlul_executoriu');
    bindData('inscrisuri');

    // button action to add penalitati
    $('#btn-add-penalitati').click(function() {

        var pen_count = $('.pen-item').length;
        if (pen_count >= 3) {
            toastr.warning('You can\'t add more than 3 ');
            return;
        }

        var type = $('select[name=penalitati]>option:selected').val();
        var procent_val = "",
            procent_is_readonly = false,
            asupra_val = "",
            asupra_is_editable = true,
            pana_val = "",
            pana_is_editable = true;

        switch (type) {
            case '1':
                procent_val = "0,2";
                procent_is_readonly = true;
                asupra_val = $("input[name=debit]").val()
                if (asupra_val == "") {
                    toastr.info('Please fill the DEBIT field, firstly!');
                    return;
                }
                asupra_val = getOnlyNumber(asupra_val, 'lei');
                asupra_val = convertWithFormat(asupra_val);
                asupra_is_editable = false;
                pana_val = 'data plății';
                pana_is_editable = false;
                break;
            case '2':
                procent_val = "0,2";
                procent_is_readonly = true;
                asupra_is_editable = true;
                pana_is_editable = true;
                break;
            case '3':
                procent_val = "";
                procent_is_readonly = false;
                asupra_is_editable = true;
                pana_is_editable = true;
                break;

        }

        var html = `<div class="form-group row pen-item">
                        <input type="hidden" name="penas[type][]" value="${type}">
                        <input type="hidden" name="penas[penalitati_simple][]">
                        <div class="col-11 row">
                            <div class="col-md-3 col-sm-6">
                                <label>PROCENT/zi:</label>
                                <input type="text" class="form-control pro" name="penas[procent_zi][]" value="${procent_val}" placeholder="Enter PROCENT/zi" ${procent_is_readonly?'readonly':''}/>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <label>ASUPRA:</label>
                                <input type="text" class="form-control asupra ${asupra_is_editable?'asupra-editable':''} " name="penas[asupra][]" value="${asupra_val}" placeholder="Enter ASUPRA" ${asupra_is_editable?'':'readonly'}/>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <label>DELA:</label>
                                <input type="text" class="form-control dela" name="penas[dela][]" placeholder="Enter DELA" />
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <label>PANA LA:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control pana ${pana_is_editable?'pana-editable':''}" name="penas[pana_la][]" value="${pana_val}" placeholder="Enter PANA LA"${pana_is_editable?'':'readonly'} />
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <label>DELETE:</label>
                            <div class="input-group">
                                <a class="btn btn-del-pen"><i class="fas fa-trash-alt icon-md" style="color: crimson"></i></a>
                            </div>
                        </div>
                    </div>`;

        if (type == 4) {
            if ($(".penalitati_simple").length >= 1) {
                toastr.info('You have already added this field')
                return
            }

            html = `
                    <div class="form-group row">
                        <input type="hidden" name="penas[type][]" value="${type}">
                        <input type="hidden" name="penas[procent_zi][]">
                        <input type="hidden" name="penas[asupra][]">
                        <input type="hidden" name="penas[dela][]">
                        <input type="hidden" name="penas[pana_la][]">
                        <input type="hidden" name="penas[zile][]">
                        <input type="hidden" name="penas[suma][]">
                        <div class="col-11 row">
                            <div class="col-md-2 col-sm-6">
                                <label>PENALITATI SIMPLE:</label>
                                <input type="text" class="form-control penalitati_simple" name="penas[penalitati_simple][]" placeholder="Enter Simple"/>
                            </div>
                        </div>    
                        
                        <div class="col-1">
                                <label>DELETE:</label>
                                <div class="input-group">
                                    <a class="btn btn-del-pen"><i class="fas fa-trash-alt icon-md" style="color: crimson"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
        }

        $('form > .card-body').append(html);
        Step1.init();
    });

    $('#btn-submit').on('click', function(e) {
        e.preventDefault();
        validator.validate().then(function(status) {
            if (status == 'Valid') {
                var form_data = $('#step1_form').serialize();
                var action = $('#step1_form').attr('action');
                if (_isValid3Field()) {
                    $.ajax({
                        url: action,
                        type: "POST",
                        data: form_data,
                        success: function(res) {
                            if (res.status == 200) {
                                showDialog({ text: res.msg });
                                setTimeout(() => {
                                    download_files = res.file_list;
                                    $('.download').show();
                                    // window.location.assign(res.url);
                                }, 1000);
                            }
                        },
                        error: function() {
                            showDialog({ text: 'Occur errors while sending data!', icon: 'error' });
                        }
                    });
                }
            }
        });
    })

    $('#btn-fetch').on('click', function(e) {
        var dosar_nr, dosar_an;
        $('.download').hide();
        dosar_nr = $('#dosar_nr').val();
        dosar_an = $('#dosar_an').val();
        if (dosar_an != "" && dosar_nr != "") {
            $.ajax({
                url: '/api/getproject/' + dosar_nr + "/" + dosar_an,
                type: "GET",
                success: function(res) {
                    var status = 'success';
                    if (res.status == 200) {
                        download_files = res.data.file_list;
                        // if (_isShowDownload(1)) $('.download').show();
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

    $('#instanta').focusout(function() {
        matchFill('instanta', 'adresa_instanta');
    });

    $('#creditor').focusout(function() {
        matchFill('creditor', 'adresa_creditor');
    });

    $('#debitor').focusout(function() {
        matchFill('debitor', 'adresa_debitor');
        matchFill('debitor', 'cui');
    });

    $('#btn-download').click(function() {
        var dosar_an, dosar_nr, url;
        dosar_an = $('#dosar_an').val();
        dosar_nr = $('#dosar_nr').val();
        fileDownload(dosar_an, dosar_nr, 1)
    });

});