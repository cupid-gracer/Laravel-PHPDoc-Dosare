// Step1 Class definition

var Step2 = function() {

    // Private functions
    var valid = function() {
        // date format
        $("#dosar_an").inputmask("9999", {
            "placeholder": "yyyy",
            autoUnmask: true
        });

        // Datepicker
        $('input[name=data_poprire], .dela, .pana-editable, input[name=data_incuviintare]').datepicker({
            todayHighlight: true,
            format: "dd.mm.yyyy",
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        }).on('changeDate', function(e) {
            validator.validate();
            if (e.currentTarget.name == "data_poprire") {
                calPenas();
                return;
            }

            var dela, pana;
            if ($(this).attr('class').toString().includes('dela')) {
                dela = e.target.value;
                pana = $(this).closest('.pen-item').find('.pana').val();
                if (pana != "" && pana !== undefined && pana.includes('data')) {
                    pana = $('input[name=data_poprire]').val();
                    // var today = new Date()
                    // pana = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()
                }
            } else if ($(this).attr('class').toString().includes('pana')) {
                pana = e.target.value;
                dela = $(this).closest('.pen-item').find('.dela').val();
            } else return;

            if (pana == "" || dela == "") return;

            dela = new Date(dela.split('.')[2] + '-' + dela.split('.')[1] + '-' + dela.split('.')[0]);
            pana = new Date(pana.split('.')[2] + '-' + pana.split('.')[1] + '-' + pana.split('.')[0]);
            const diffTime = (pana - dela);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            $(this).closest('.pen-item').find('.zile').val(diffDays);
            calSUMA($(this));
            calTotal()

        });

    }

    var action = function() {
        $('.btn-del-pen').click(function() {
            $(this).parent().parent().parent().remove();
            calTotal()
            _isShowSumaTotal()
        });

        $("input[name=cheltuieli_judecata]").focusout(function() {
            var value = $(this).val();
            value = convertWithFormat(value);
            if (value != "") {
                value += " lei, reprezentând cheltuieli de judecată";
                $(this).val(value);
            }
            calTotal()
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
            calTotal()
        });

        $("input[name=taxa_timbru], .penalitati_simple, .asupra-editable, input[name=cheltuieli_materiale], input[name=onorariu_avocat], .pro, input[name=cheltuieli_materiale]").focusout(function() {
            var value = $(this).val();
            value = convertWithFormat(value);
            if (value != "") {
                $(this).val(value);
                calSUMA($(this))
                calTotal()
            }
        });

        $("input[name=taxa_timbru], .penalitati_simple, .asupra-editable, input[name=cheltuieli_materiale], input[name=onorariu_avocat], .pro, input[name=cheltuieli_materiale]").focusin(function() {
            var value = $(this).val();
            value = getOnlyNumber(value, 'lei');
            $(this).val(value);
        });

        $('.pro, .asupra-editable, .penalitati_simple').on("input", function() {
            calSUMA($(this))
            calTotal()
        });

        $('.debit').on('input', function() {
            var value = $(this).val()

            $('.asupra').each(function() {
                if ($(this).attr('readonly') == "readonly") {
                    $(this).val(convertWithFormat(value));
                    calSUMA($(this));

                }
            });
        });

        $("input[name=cheltuieli_judecata], input[name=debit], input[name=taxa_timbru], input[name=cheltuieli_materiale], input[name=onorariu_avocat]").on('input', function() {
            calTotal()
        })


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

    Step2.init();

    bindData('dosar_an', $('#dosar_nr').val());
    bindData('creditor');
    bindData('adresa_creditor');
    bindData('debitor');
    bindData('adresa_debitor');
    bindData('cui');
    bindData('format_titlu_executoriu');
    bindData('titlul_executoriu');
    bindData('inscrisuri');
    bindData('adresa_banca');
    bindData('banca');


    // button action to add penalitati
    $('#btn-add-penalitati').click(function() {


        var pen_count = $('.pen-item').length;
        var type = $('select[name=penalitati]>option:selected').val();
        if (pen_count >= 3 && type != 4) {
            toastr.warning('You can\'t add more than 3 ');
            return;
        }

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
            default:
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
                            <div class="col-md-2 col-sm-6">
                                <label>PROCENT/zi:</label>
                                <input type="text" class="form-control pro" name="penas[procent_zi][]" value="${procent_val}" placeholder="Enter PROCENT/zi" ${procent_is_readonly?'readonly':''}/>
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <label>ASUPRA:</label>
                                <input type="text" class="form-control asupra ${asupra_is_editable?'asupra-editable':''} " name="penas[asupra][]" value="${asupra_val}" placeholder="Enter ASUPRA" ${asupra_is_editable?'':'readonly'}/>
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <label>DELA:</label>
                                <input type="text" class="form-control dela" name="penas[dela][]" placeholder="Enter DELA" />
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <label>PANA LA:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control pana ${pana_is_editable?'pana-editable':''}" name="penas[pana_la][]" value="${pana_val}" placeholder="Enter PANA LA"${pana_is_editable?'':'readonly'} />
                                </div>
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <label>ZILE:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control zile" name="penas[zile][]" readonly />
                                </div>
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <label>SUMA:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control suma" name="penas[suma][]" readonly />
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
        $('.pena-items').append(html);
        _isShowSumaTotal()
        Step2.init();
    });

    $('#btn-submit').on('click', function(e) {
        e.preventDefault();
        validator.validate().then(function(status) {
            if (status == 'Valid') {
                var form_data = $('#step2_form').serialize();
                var action = $('#step2_form').attr('action');
                if (_isValid3Field())
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
                        // if (_isShowDownload(3)) $('.download').show();
                        RenderHtml.init(res.data);
                        calPenas();
                        _isShowSumaTotal()
                        validator.validate()
                    } else {
                        status = 'warning';
                    }
                    calTotal();
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

    $('#creditor').focusout(function() {
        matchFill('creditor', 'adresa_creditor');
    });

    $('#debitor').focusout(function() {
        matchFill('debitor', 'adresa_debitor');
        matchFill('debitor', 'cui');
    });

    $('#banca').focusout(function() {
        matchFill('banca', 'adresa_banca');
    });

    $('#btn-download').click(function() {
        var dosar_an, dosar_nr, url;
        dosar_an = $('#dosar_an').val();
        dosar_nr = $('#dosar_nr').val();
        fileDownload(dosar_an, dosar_nr, 2)
    });

});


function calSUMA(el) {
    var pro, asupra, zile, suma;
    pro = el.closest('.pen-item').find('.pro').val();
    asupra = el.closest('.pen-item').find('.asupra').val();
    zile = el.closest('.pen-item').find('.zile').val();
    if (pro === undefined || asupra === undefined || zile === undefined) return;
    pro = getDefaultNum(pro);
    asupra = getDefaultNum(asupra);
    zile = getDefaultNum(zile);

    if (pro == "" || asupra == "" || zile == "") suma = "";
    else {
        suma = ((pro * asupra * zile) / 100);
        // suma = parseFloat(suma);
        suma = convertMoneyFormat(suma);
    }
    el.closest('.pen-item').find('.suma').val(suma);
}

function calTotalPena() {
    var total_pena = 0
    $('.suma').each(function() {
        var suma = $(this).val()
        if (suma == "") suma = '0';
        total_pena += getDefaultNum(suma)
    });

    var simple = $('#simple').val()
    if (simple == "") simple = '0'
    var total_penalitati_simple = getDefaultNum(simple) + total_pena

    $('input[name=total_penalitati]').val(convertMoneyFormat(total_pena))
    $('input[name=total_penalitati_simple]').val(convertMoneyFormat(total_penalitati_simple))

}


function calTotalDP() {
    var total_dp = 0
    var total_pena = $('input[name=total_penalitati]').val()
    if (total_pena == "") total_pena = '0';

    var ch = $('input[name=cheltuieli_judecata]').val()
    var debit = $('input[name=debit]').val()
    var penalitati_simple = $('.penalitati_simple').val()



    total_pena = getDefaultNum(total_pena)
    ch = getDefaultNum(ch, 'lei')
    debit = getDefaultNum(debit, 'lei')
    penalitati_simple = getDefaultNum(penalitati_simple)

    total_dp = total_pena + ch + debit + penalitati_simple

    $('input[name=debit_plus_penalitati]').val(convertMoneyFormat(total_dp))
}

function calOnora() {
    var total_dp = $('input[name=debit_plus_penalitati]').val()
    total_dp = getDefaultNum(total_dp)
    var onora = 0;
    if (total_dp > 50000 && total_dp <= 80000) {
        total_dp = 5000 + ((total_dp - 50000) * 3) / 100;
    } else if (total_dp > 80000 && total_dp <= 100000) {
        total_dp = 5900 + ((total_dp - 80000) * 2) / 100;
    } else if (total_dp > 100000) {
        total_dp = 6300 + (total_dp - 100000) / 100;
    } else {
        onora = ((total_dp / 10) * 19) / 100 + (total_dp / 10)
        $('input[name=onorariu]').val(convertMoneyFormat(onora))
        return
    }
    total_dp = getDefaultNum(convertMoneyFormat(total_dp))
    onora = (total_dp * 19) / 100 + total_dp
    $('input[name=onorariu]').val(convertMoneyFormat(onora))
}


function calTotalCH() {
    var onora = $('input[name=onorariu]').val()
    onora = getDefaultNum(onora)

    var chel = $('input[name=cheltuieli_materiale]').val()
    chel = getDefaultNum(chel)

    var onora_av = $('input[name=onorariu_avocat]').val()
    if (onora_av == "") onora_av = '0';
    onora_av = getDefaultNum(onora_av)

    var taxa = $('input[name=taxa_timbru]').val()
    if (taxa == "") taxa = '0';
    taxa = getDefaultNum(taxa)

    var total_ch = onora + chel + onora_av + taxa
    $('input[name=total_cheltuieli]').val(convertMoneyFormat(total_ch))

    var total_dp = $('input[name=debit_plus_penalitati]').val() // set "TOTAL CHELTUIELI:"
    total_dp = getDefaultNum(total_dp)

    var somatie = total_ch + total_dp
    $('input[name=total_somatie]').val(convertMoneyFormat(somatie)) // set "SOMATIE:"

}

function calTotal() {
    calTotalPena()
    calTotalDP()
    calOnora()
    calTotalCH()
    calSuma_creditor()
    calSuma_cheltuieli()
}

function calAlways() {
    calTotalPena()
    calTotalDP()
    calOnora()
    calTotalCH()
    calSuma_creditor()
    calSuma_cheltuieli()
}

function calPenas() {
    $('.pen-item').each(function() {
        var dela, pana;
        dela = $(this).find('.dela').val();
        pana = $(this).find('.pana').val();
        if (pana != "" && pana !== undefined && pana.includes('data')) {
            pana = $('input[name=data_poprire]').val();
            if (pana == "") return;
        }
        console.log(dela);
        console.log(pana);
        dela = new Date(dela.split('.')[2] + '-' + dela.split('.')[1] + '-' + dela.split('.')[0]);
        pana = new Date(pana.split('.')[2] + '-' + pana.split('.')[1] + '-' + pana.split('.')[0]);
        const diffTime = (pana - dela);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        $(this).closest('.pen-item').find('.zile').val(diffDays);
        calSUMA($(this));
        calTotal()
    });
}

function calSuma_creditor() {
    var suma_creditor = 0
    var total_pena = $('input[name=total_penalitati]').val()
    if (total_pena == "") total_pena = '0';

    var ch = $('input[name=cheltuieli_judecata]').val()
    var debit = $('input[name=debit]').val()
    var taxa = $('input[name=taxa_timbru]').val()
    var onorariu_avocat = $('input[name=onorariu_avocat]').val()

    total_pena = getDefaultNum(total_pena)
    ch = getDefaultNum(ch, 'lei')
    debit = getDefaultNum(debit, 'lei')
    taxa = getDefaultNum(taxa)
    onorariu_avocat = getDefaultNum(onorariu_avocat)

    suma_creditor = total_pena + ch + debit + taxa + onorariu_avocat
    $('input[name=suma_creditor]').val(convertMoneyFormat(suma_creditor))
}

function calSuma_cheltuieli() {
    var suma_cheltuieli = 0

    var onorariu = $('input[name=onorariu]').val()
    var cheltuieli_materiale = $('input[name=cheltuieli_materiale]').val()

    onorariu = getDefaultNum(onorariu)
    cheltuieli_materiale = getDefaultNum(cheltuieli_materiale)

    suma_cheltuieli = onorariu + cheltuieli_materiale

    $('input[name=suma_cheltuieli]').val(convertMoneyFormat(suma_cheltuieli))
}

function _isShowSumaTotal() {
    var pen_count = $('.pen-item').length;
    if (pen_count > 0)
        $("#total_penalitati").show();
    else
        $("#total_penalitati").hide();
}


var RenderHtml = function() {

    var fillForm = function(data) {
        $('input[name=data_poprire]').val(data.data_poprire);
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
        $('input[name=onorariu_avocat]').val(data.onorariu_avocat);
        $('input[name=data_incuviintare]').val(data.data_incuviintare);
        $('input[name=banca]').val(data.banca);
        $('input[name=adresa_banca]').val(data.adresa_banca);
        $('input[name=simple]').val(data.simple);
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
                                    <div class="col-md-2 col-sm-6">
                                        <label>PROCENT/zi:</label>
                                        <input type="text" class="form-control pro" name="penas[procent_zi][]" value="${pena.procent_zi}" placeholder="Enter PROCENT/zi" ${procent_is_readonly?'readonly':''}/>
                                    </div>
                                    <div class="col-md-2 col-sm-6">
                                        <label>ASUPRA:</label>
                                        <input type="text" class="form-control asupra ${asupra_is_editable?'asupra-editable':''} " name="penas[asupra][]" value="${pena.asupra}" placeholder="Enter ASUPRA" ${asupra_is_editable?'':'readonly'}/>
                                    </div>
                                    <div class="col-md-2 col-sm-6">
                                        <label>DELA:</label>
                                        <input type="text" class="form-control dela" name="penas[dela][]" value="${pena.dela}" placeholder="Enter DELA" />
                                    </div>
                                    <div class="col-md-2 col-sm-6">
                                        <label>PANA LA:</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control pana ${pana_is_editable?'pana-editable':''}" name="penas[pana_la][]" value="${pena.pana_la}" placeholder="Enter PANA LA"${pana_is_editable?'':'readonly'} />
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-sm-6">
                                        <label>ZILE:</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control zile" name="penas[zile][]" value="${pena.zile ?pena.zile:0}" readonly />
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-sm-6">
                                        <label>SUMA:</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control suma" name="penas[suma][]" value="${pena.suma?pena.suma:0}" readonly />
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
                                    <input type="text" id="simple" class="form-control penalitati_simple" name="penas[penalitati_simple][]" placeholder="Enter Simple" value="${pena.penalitati_simple}"/>
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
        Step2.init();

    }

    return {
        init: function(data) {
            fillForm(data.project);
            renderPenaComponent(data.penas);
        }
    }
}();