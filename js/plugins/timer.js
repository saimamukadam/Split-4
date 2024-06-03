/*:
 * @plugindesc Displays a timer on the screen.
 * @param timerX
 * @text Timer X Position
 * @desc The X position of the timer on the screen.
 * @default 10
 *
 * @param timerY
 * @text Timer Y Position
 * @desc The Y position of the timer on the screen.
 * @default 10
 * 
 * @param timerColor
 * @text Timer Color
 * @desc The color of the timer text in CSS format.
 * @default white
 *
 * @help This plugin displays a timer on the screen.
 */

(function() {
    var parameters = PluginManager.parameters('TimerDisplay');
    var timerX = Number(parameters['timerX'] || 10);
    var timerY = Number(parameters['timerY'] || 10);
    var timerColor = String(parameters['timerColor'] || 'white');

    var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        this.createTimerWindow();
    };

    Scene_Map.prototype.createTimerWindow = function() {
        this._timerWindow = new Window_TimerDisplay(timerX, timerY);
        this.addWindow(this._timerWindow);
    };

    function Window_TimerDisplay() {
        this.initialize.apply(this, arguments);
    }

    Window_TimerDisplay.prototype = Object.create(Window_Base.prototype);
    Window_TimerDisplay.prototype.constructor = Window_TimerDisplay;

    Window_TimerDisplay.prototype.initialize = function(x, y) {
        var width = 200;
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._seconds = 0;
        this.refresh();
        this.update();
    };

    Window_TimerDisplay.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this._seconds !== $gameTimer.seconds()) {
            this._seconds = $gameTimer.seconds();
            this.refresh();
        }
    };

    Window_TimerDisplay.prototype.refresh = function() {
        this.contents.clear();
        this.changeTextColor(timerColor);
        var minutes = Math.floor(this._seconds / 60);
        var seconds = this._seconds % 60;
        var text = minutes.padZero(2) + ':' + seconds.padZero(2);
        this.drawText(text, 0, 0, this.contents.width, 'left');
    };

    Window_TimerDisplay.prototype.changeTextColor = function(color) {
        this.contents.textColor = color;
    };

})();
