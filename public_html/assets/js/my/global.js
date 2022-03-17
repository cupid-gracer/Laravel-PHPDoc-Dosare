var download_files = [];


$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function numberWithCommas1(x) {
    var str = x.toString();
    var result = "";
    for (let i = str.length - 1, j = 1; i >= 0; i--, j++) {
        result += str[i];
        if (j == 2) result += ",";
        else if (j == 5 && i > 0) result += ".";
        else if (j > 5 && (j + 1) % 3 == 0 && i > 0) result += ".";
    }
    return result.split("").reverse().join("");
}

function numberWithCommas(x) {
    return x.toLocaleString("ro-RO");
}

function isNumeric(str) {
    // if (typeof str == "string") return false // we only process strings!  
    return !isNaN(parseFloat(str));
}

function getOnlyNumber(str, ptr = '') { //   from: setence,  to: get only number in , romanian number
    if (str == "") return "";
    if (ptr == "") str = str.trim();
    else str = str.split(ptr)[0].trim();
    str = str.replaceAll('.', "");
    str = str.replaceAll(',', ".");
    str = parseFloat(str);
    if (isNaN(str)) {
        toastr.info("Number format is wrong!");
        return "";
    }
    return str.toString().replace('.', ",");
    // return str.toLocaleString("ro-RO");
}

function convertWithFormat(str, format = "ro-RO") { //  from: romanian format number,  to: fixed(2) romanian number
    // if (isNumeric(str)) str = str.toString();
    str = str.replaceAll('.', "");
    str = str.replaceAll(',', ".");
    str = parseFloat(str);
    if (isNaN(str)) {
        toastr.info("Number format is wrong!");
        return "";
    }
    return convertMoneyFormat(str);
}

function getDefaultNum(str, ptr = "") { // get default  en-US number
    if (str == null || str == "") return 0;
    if (ptr == "") str = str.trim();
    else str = str.split(ptr)[0].trim();
    str = str.replaceAll('.', "");
    str = str.replaceAll(',', ".");
    str = parseFloat(str);
    if (isNaN(str)) {
        return "";
    }
    return str;
}

function convertMoneyFormat(num, type = 1) {
    var str = num.toLocaleString('ro-RO');
    if (!str.includes(',')) str += ",00";
    else if (str.split(',')[1].length == 1) str += "0";
    else if (str.split(',')[1].length > 2) {
        str = str.slice(0, -(str.split(',')[1].length - 2));
    }
    if (type == 2) {
        str = str.replaceAll('.', '');
        str = str.replaceAll(',', '.');
    }
    return str;
}

function showDialog({ text: text = "", icon: icon = 'success', btnText: btnText = 'OK', isUp: isUp = true }) {
    swal.fire({
        text: text,
        icon: icon,
        buttonsStyling: true,
        confirmButtonText: btnText,
        customClass: {
            confirmButton: "btn font-weight-bold btn-light-primary"
        }
    }).then(function() {
        isUp ? KTUtil.scrollTop() : '';
    });
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) { return a.indexOf(i) < 0; });
};



// bind data with the components which #id
function bindData(id, data = "") {

    var url = HOST_URL + '/api/fetchtypeahead/' + id + (data == "" ? "/no" : ("/" + data));
    var temp = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: url
    });

    // typeahead item
    $('#' + id).typeahead(null, {
        name: 'id',
        source: temp
    });

    $('#' + id).bind(id + ':select', function(ev, suggestion) {
        console.log('ev:', ev);
        console.log('suggestion:', suggestion);
        // Revalidate field
        // validator.revalidateField(id);
    });
}

function matchFill(from, to) {
    var search_val = $('#' + from).val();
    if (search_val == "") return;
    $.ajax({
        url: '/api/matchfill/' + from + '/' + to + '/' + search_val,
        type: 'GET',
        success: function(res) {
            if (res.status == 200) {
                $('#' + to).val(res.result)
            }
            // else $('#' + to).val("");
        }
    });
}


function fileDownload(dosar_an, dosar_nr, type) {
    url = '/result/' + dosar_an + '/' + dosar_nr + '/';
    console.log(type)
    switch (type) {
        case 1:
            _download(1, url)
            _download(2, url)
            break;

        case 2:
            _download(3, url)
            _download(4, url)
            _download(5, url)
            _download(6, url)
            _download(7, url)
            break;

        case 3:
            _download(8, url)
            _download(9, url)

            break;

        default:
            break;
    }
}

function _download(key, url) {
    download_files.forEach(file => {
        if (file.substr(0, 1).includes(key)) {
            window.open(url + file);
            console.log('download:', url + file);
        }
    });
}

function _isShowDownload(key) {
    var isShow = false;
    download_files.forEach(file => {
        if (file.includes(key)) {
            isShow = true;
        }
    });
    return isShow;
}

function _isValid3Field() // CH.JUDECATA:  DEBIT:  PENALITATI:  at least needs one.
{
    var chj = $("input[name=cheltuieli_judecata]").val();
    var debit = $("input[name=debit]").val();
    var pen_count = $('.pen-item').length;

    if (chj == "" && debit == "" && pen_count == 0) {
        toastr.info('Please fill CH.JUDECATA  or DEBIT  or  PENALITATI at least one');
        return false;
    }
    return true;

}