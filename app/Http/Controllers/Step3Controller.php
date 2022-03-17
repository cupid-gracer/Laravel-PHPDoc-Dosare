<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Utils\Document;
use App\Models\Project;
use App\Models\Pena;


class Step3Controller extends Controller
{
    protected $document;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        pageSetinfo('step3', 'Elierare');
        $this->document = new Document;
        // $this->middleware(['auth']);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.step3');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->input();
        $msg = "Updated Successfully";

        $project = Project::where('dosar_nr', $input['dosar_nr'])->where('dosar_an', $input['dosar_an'])->first();
        if($project){
            $project->update($input);
        }else{
            return response()->json(['status' => 300, 'msg' => __('msg.cant_create')]);
        }

        $this->document->makeDocFromTemplate(8, $project);
        $this->document->makeDocFromTemplate(9, $project);
        return response()->json(['status' => 200, 'msg' => __('msg.success_update'), 'url' => '/', 'file_list' => $this->document->existDoc($input['dosar_nr'], $input['dosar_an'])]);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //
    }

}
