<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Utils\Document;
use App\Models\Project;
use App\Models\Pena;


class Step2Controller extends Controller
{
    protected $document;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        pageSetinfo('step2', 'Poprire');
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
        return view('pages.step2');
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
        $penas = $request->input('penas');
        $penas = array_reafactor($penas);
        $msg = __('msg.success_create');

        $project = Project::where('dosar_nr', $input['dosar_nr'])->where('dosar_an', $input['dosar_an'])->first();
        if($project){
            $project->update($input);
            $msg = __('msg.success_update');
        }else{
            $project = Project::create($input);
        }
        
        $penas_db = Pena::where('project_id',$project->id)->get();
        if(count($penas_db)){
            $pena_ids = [];
            foreach ($penas as $_pena) {
                if(!array_key_exists('id', $_pena))$_pena['id'] = 0;
                $pena = Pena::where('project_id',$project->id)->where('id', $_pena['id'])->first();
                if($pena) $pena->update($_pena);
                else {
                    $_pena['project_id'] = $project->id;
                    $pena = Pena::create($_pena);
                }
                array_push($pena_ids, $pena->id);
            }
            foreach ($penas_db as $record) {
                $f = false;
                foreach ($pena_ids as $pena_id) {
                    if($record->id == $pena_id) {$f = true; break;}
                }
                if(!$f){
                    $record->delete();
                }
            }

        }else{
            foreach ($penas as $_pena) {
                $_pena['project_id'] = $project->id;
                Pena::create($_pena);
            }
        }

        $penas = Pena::where('project_id', $project->id)->get();

        $this->document->makeDocFromTemplate(3, $project, $penas);
        $this->document->makeDocFromTemplate(4, $project);
        $this->document->makeDocFromTemplate(5, $project);
        $this->document->makeDocFromTemplate(6, $project);
        $this->document->makeDocFromTemplate(7, $project);
        return response()->json(['status' => 200, 'msg' => $msg, 'url' => '/eliberare', 'file_list' => $this->document->existDoc($input['dosar_nr'], $input['dosar_an'])]);
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
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //
    }

}
