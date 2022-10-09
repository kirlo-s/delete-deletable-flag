const deletable = (function () {

    const pluginName = "portal-editable";

    const deletableRegister = (function (){
        function precondition() {
            return "enabled";
        }

        function callback() {
            const parser = new window.DOMParser();

            const workspace = _Blockly.getMainWorkspace();
            const workspaceData = _Blockly.Xml.domToText(_Blockly.Xml.workspaceToDom(workspace, true));
            
            const xmlData = parser.parseFromString( workspaceData , "text/xml");
            const d = xmlData.querySelectorAll('[deletable]');

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

        return {
            id: "disable-write-protect",
            displayText: "Enable Edit",
            // eslint-disable-next-line no-undef
            scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
            weight: 99,
            preconditionFn: precondition,
            callback: callback
        };
    })();



    function init() {
        plugin = BF2042Portal.Plugins.getPlugin(pluginName);

        _Blockly.ContextMenuRegistry.registry.register(deletableRegister);
    }

    init();
    return {
        init: init
    };
})();