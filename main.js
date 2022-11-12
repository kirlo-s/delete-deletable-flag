const deletable = (function () {

    const pluginName = "portal-editable";

    function deleteAttributes(){
        const parser = new window.DOMParser();

        const workspace = _Blockly.getMainWorkspace();
        const workspaceData = _Blockly.Xml.domToText(_Blockly.Xml.workspaceToDom(workspace, true));
        
        const xmlData = parser.parseFromString( workspaceData , "text/xml");
        const d = xmlData.querySelectorAll('[deletable]');
        if(d.length == 0){
            return;
        }

        for(i of d){
            i.removeAttribute('deletable');
            i.removeAttribute('movable');
            i.removeAttribute('editable');
        }

        var s = new XMLSerializer();
        var xmlStr = s.serializeToString(xmlData);

        _Blockly.getMainWorkspace().clear();
        _Blockly.Xml.domToWorkspace(_Blockly.Xml.textToDom(xmlStr), workspace);

    }


    function init() {
        plugin = BF2042Portal.Plugins.getPlugin(pluginName);

        plugin.initializeWorkspace = function(){
            deleteAttributes();
        };
    }

    init();
    return {
        init: init
    };
})();