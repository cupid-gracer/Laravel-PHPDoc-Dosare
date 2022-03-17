@extends('layouts.app')


@section('content')
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <!--begin::Subheader-->
        <div class="subheader py-2 py-lg-12 subheader-transparent" id="kt_subheader">
            <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                <!--begin::Info-->
                <div class="d-flex align-items-center flex-wrap mr-1">
                    <!--begin::Heading-->
                    <div class="d-flex flex-column">
                        <!--begin::Title-->
                        <h2 class="text-white font-weight-bold my-2 mr-5">{{ Session::get('pagetitle') }}</h2>
                        <!--end::Title-->
                    </div>
                    <!--end::Heading-->
                </div>
                <!--end::Info-->
            </div>
        </div>
        <!--end::Subheader-->
        <!--begin::Entry-->
        <div class="d-flex flex-column-fluid">
            <!--begin::Container-->
            <div class="container">
                <!--begin::Dashboard-->
                <!--begin::Row-->
                <div class="row">
                    <div class="col-xl-12">
                        <!--begin::Tiles Widget 1-->
                        <div class="card card-custom gutter-b card-stretch">
                            <!--begin::Header-->
                            <div class="card-header border-0 pt-5">
                                <div class="card-title">
                                    <div class="card-label">
                                        <div class="font-weight-bolder">Please Fill Form </div>
                                    </div>
                                </div>
                            </div>
                            <!--end::Header-->
                            <!--begin::Body-->
                            <div class="card-body d-flex flex-column px-0">
                                <form id="step2_form" class="form" action="/poprire" method="POST">
                                    @csrf
                                    <div class="form-group">
                                        <div class="alert alert-light-primary d-none mb-15" role="alert" id="kt_form_msg">
                                            <div class="alert-icon">
                                                <i class="la la-warning"></i>
                                            </div>
                                            <div class="alert-text font-weight-bold">
                                                Oh snap! Change a few things up and try submitting again.
                                            </div>
                                            <div class="alert-close">
                                                <button type="button" class="close" data-dismiss="alert"
                                                    aria-label="Close">
                                                    <span><i class="ki ki-close "></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group row" id="test">
                                            <div class="col-lg-3">
                                                <label>Dosar nr.:</label>
                                                <input type="number" id="dosar_nr" class="form-control" name="dosar_nr"
                                                    placeholder="Enter Dosar nr" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>Dosar an:</label>
                                                <div class="typeahead">
                                                    <input class="form-control" id="dosar_an" type="number"
                                                        name="dosar_an" placeholder="Enter Dosar an" />
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <label>Fetch Data:</label>
                                                <a id="btn-fetch" class="form-control btn btn-primary"><i class="fa fa-sync"></i>
                                                <span style="margin-left:10px">Sync</span></a>
                                                
                                            </div>
                                            <div class="col-lg-2 download" style="display: none">
                                                <label>Download :</label>
                                                <a id="btn-download" class="form-control btn btn-success">
                                                    <i class="fa fa-download"></i>
                                                    Download</a>
                                            </div>
                                        </div>
                                        <div class="separator separator-dash my-10"></div>
                                        <div class="form-group row">
                                            <div class="col-lg-3">
                                                <label>DATA POPRIRE:</label>
                                                <input type="text" class="form-control" name="data_poprire"
                                                    placeholder="Enter DATA PROPRIRE" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>DATA INCUVIINTARE:</label>
                                                <input type="text" class="form-control" name="data_incuviintare"
                                                    placeholder="Enter DATA INCUVIINTARE" />
                                            </div>
                                            <div class="col-lg-9"></div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-6">
                                                <label>CREDITOR:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="creditor" class="form-control" name="creditor"
                                                        placeholder="Enter CREDITOR" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <label>ADRESA CREDITOR:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="adresa_creditor" class="form-control"
                                                        name="adresa_creditor" placeholder="Enter ADRESA CREDITOR" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-6">
                                                <label>DEBITOR:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="debitor" class="form-control" name="debitor"
                                                        placeholder="Enter DEBITOR" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <label>ADRESA DEBITOR:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="adresa_debitor" class="form-control"
                                                        name="adresa_debitor" placeholder="Enter ADRESA DEBITOR" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-6">
                                                <label>BANCA:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="banca" class="form-control" name="banca"
                                                        placeholder="Enter BANCA" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <label>ADRESA BANCA:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="adresa_banca" class="form-control"
                                                        name="adresa_banca" placeholder="Enter ADRESA BANCA" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-10"></div>
                                            <div class="col-lg-2">
                                                <label>C.U.I.:</label>
                                                <div class="typeahead">
                                                    <input type="number" id="cui" class="form-control" name="cui"
                                                        placeholder="Enter C.U.I" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="separator separator-dashed my-10"></div>
                                        <div class="form-group row">
                                            <div class="col-lg-12">
                                                <label>TITLUL EXECUTORIU:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="titlul_executoriu" class="form-control"
                                                        name="titlul_executoriu" placeholder="Enter TITLUL EXECUTORIU" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-8">
                                                <label>INSCRISURI:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="inscrisuri" class="form-control"
                                                        name="inscrisuri" placeholder="Enter INSCRISURI" />
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <label>FORMAT TITLU EXECUTORIU:</label>
                                                <div class="typeahead">
                                                    <input type="text" id="format_titlu_executoriu" class="form-control"
                                                        name="format_titlu_executoriu"
                                                        placeholder="Enter FORMAT TITLU EXECUTORIU" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-3">
                                                <label>CH.JUDECATA:</label>
                                                <input type="text" class="form-control" name="cheltuieli_judecata"
                                                    placeholder="Enter CH.JUDECATA" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>DEBIT:</label>
                                                <input type="text" class="form-control debit" name="debit"
                                                    placeholder="Enter DEBIT" />
                                            </div>
                                            <div class="col-lg-2">
                                                <label>TAXA:</label>
                                                <input type="text" class="form-control" name="taxa_timbru"
                                                    placeholder="Enter TAXA TIMBRU" />
                                            </div>
                                            <div class="col-lg-4">
                                                <label>PENALITATI:</label>
                                                <div class="input-group">
                                                    <select name="penalitati" class="form-control"
                                                        placeholder="Enter PENALITATI">
                                                        <option value="1">0,2%/zi asupra debitului principal</option>
                                                        <option value="2">0,2%/zi asupra sumei de</option>
                                                        <option value="3">custom</option>
                                                        <option value="4">simple</option>
                                                    </select>
                                                    <div class="input-group-append"><a id="btn-add-penalitati"
                                                            class="btn btn-success"><i class="la la-plus"></i></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="separator separator-dashed my-10"></div>
                                        <div class="pena-items"></div>
                                        <div class="form-group row sumaTotal">
                                            <div class="col-lg-6"></div>
                                            <div class="col-lg-3">
                                                <div id="total_penalitati" style="display: none">
                                                    <label>TOTAL PENALITATI:</label>
                                                    <input type="text" class="form-control" name="total_penalitati" readonly />
                                                    <input type="hidden" name="total_penalitati_simple" />
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <label>TOTAL D+P:</label>
                                                <input type="text" class="form-control" name="debit_plus_penalitati"
                                                    readonly />
                                            </div>
                                        </div>
                                        <div class="separator separator-dashed my-10 sumaTotal"></div>
                                        <div class="form-group row">
                                            <div class="col-lg-3">
                                                <label>ONORARIU:</label>
                                                <input type="text" class="form-control" name="onorariu" readonly />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>CHELTUIELI:</label>
                                                <input type="text" class="form-control" name="cheltuieli_materiale"
                                                    value="1.428,00" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>ONORARIU AV.:</label>
                                                <input type="text" class="form-control" name="onorariu_avocat" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>TOTAL CHELTUIELI:</label>
                                                <input type="text" class="form-control" name="total_cheltuieli"
                                                    readonly />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-9"></div>
                                            <div class="col-lg-3">
                                                <label>SOMATIE:</label>
                                                <input type="text" class="form-control" name="total_somatie" readonly />
                                            </div>
                                        </div>
                                        <input type="hidden" name="suma_creditor">
                                        <input type="hidden" name="suma_cheltuieli">
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                            <div class="col-lg-3"></div>
                                            <button id="btn-submit" type="submit" class="btn btn-primary mr-2 col-lg-3  mt-3">
                                                <i class="fa fa-save"></i>
                                                SAVE</button>
                                            <button type="reset"
                                                class="btn btn-secondary mr-2  col-lg-3 mt-3">
                                                <i class="far fa-times-circle"></i>
                                                CANCEL</button>
                                            <div class="col-lg-3"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!--end::Body-->
                        </div>
                        <!--end::Tiles Widget 1-->
                    </div>
                </div>
                <!--end::Row-->
                <!--end::Dashboard-->
            </div>
            <!--end::Container-->
        </div>
        <!--end::Entry-->
    </div>
@endsection

@section('myJS')
    <script src="assets/js/my/step2_form_validate.js"></script>
    <script src="assets/js/my/step2.js"></script>
@endsection
