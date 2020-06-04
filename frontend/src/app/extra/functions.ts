export class Functions {

    public static restrictNumeric(e) {
        let input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }
    public static restrictEspace(e) {
        let key = e.keyCode || e.which;
        let tecla = String.fromCharCode(key).toLowerCase();
        let letras = "abcdefghijklmnopqrstuvwxyz0123456789.";
        let especiales = "8-37-39-46";
    
        let tecla_especial = false
        for (var i in especiales.split('-')) {
          if (key == i) {
            tecla_especial = true;
            break;
          }
        }
        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
          return false;
        }
    }

}
