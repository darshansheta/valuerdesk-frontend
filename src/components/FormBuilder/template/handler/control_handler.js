var ControlHandler = {};

ControlHandler.clearSelect = function () {
    $(".controlItem").removeClass('onSelect');
};

ControlHandler.setSelect = function (controlID) {
    $("#" + controlID).addClass('onSelect');
};

ControlHandler.getSelectedItem = function () {
    return $(".onSelect").attr('id');
};

ControlHandler.isControlNameExisted = function (rowID, controlName) {
    //var controls = $(`#${rowID}`).parents(".sectionBody").find(`[name='${controlName}']`);
    var controls = $(`#sectionWrapper`).find(`[name='${controlName}']`);
    return controls.length >= 1;
};
ControlHandler.getControlNames = function (rowID, controlName) {
    //var controls = $(`#${rowID}`).parents(".sectionBody").find(`[name='${controlName}']`);
    return $(`#sectionWrapper`).find('[name]').map(function () { return $(this).attr('name') }).toArray();
};

export {
    ControlHandler
}
