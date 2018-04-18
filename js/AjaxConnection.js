class AjaxConnection {

     constructor() {
          this._xmlHttp = this.createXmlHttp(); // composition instead of inheritance
     }                                          // with composition you know what you get
                                                // no 'extra baggage'
    getxmlHttp() {
        return this._xmlHttp;
    }

    createXmlHttp() {
        let xmlHttp;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlHttp = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlHttp;
    }

    openConnection(method, url, updateStatus) {
        this._xmlHttp.open(method, url, updateStatus);
    }

    setHeaders(contentType, value) {
        this._xmlHttp.setRequestHeader(contentType, value);
    }

    sendData() {
        this._xmlHttp.send();
    }

    sendDataWithParam(parameter){
         this._xmlHttp.send(parameter);
    }

    showProgress(){
        this._xmlHttp.addEventListener("progress", this.inProgress(), false);
    }

    inProgress(){
        console.log('in progress');
    }


    loadComplete(msg, displayArea){
        //displayMsg('Item added', 'success', displayArea);
        this._xmlHttp.addEventListener("load", this.loaded(msg, displayArea), false);
    }

    loaded(msg, displayArea){
        this.displayMsg(msg, 'success', displayArea);
    }

    loadInComplete(msg,displayArea){
        this._xmlHttp.addEventListener("error", this.showError(msg, displayArea), false);
    }

    showError(msg, displayArea){
        this.displayMsg(msg, 'warning', displayArea);
        //displayArea.innerText = '';
        //displayArea.innerHTML= 'No results found. Try Again';
    }

    /**
     * Display messages accordingly to the parameters passed.
     * @param msg
     * @param type
     * @param textBox
     */
    displayMsg(msg, type, textBox) {

        let boxTimeout = 0;
        let displayBox = document.createElement("div");
        if(type === 'warning'){
            displayBox.className = "alert alert-warning";
        }
        else if(type === 'success'){
            displayBox.className = "alert alert-success";
        }
        else if (type === 'info') {
            displayBox.className = "alert alert-info";
        } else if (type === 'danger') {
            displayBox.className = "alert alert-danger";
        }

        this.styleBox(displayBox);
        displayBox.innerHTML = msg;

        if (document.body.contains(displayBox)) {
            clearTimeout(boxTimeout);
        } else {

            let myTextBox = textBox;
            myTextBox.parentNode.insertBefore(displayBox, myTextBox.previousSibling);
        }

        setTimeout(function() {
            displayBox.parentNode.removeChild(displayBox);
            boxTimeout = -1;
        }, 2000);
    }

    /**
     * The method styles the display box used in the displayMsg method.
     * @param displayBox
     * @returns {*}
     */
    styleBox(displayBox){
        displayBox.style.position = 'relative';
        displayBox.style.textAlign = 'center';
        displayBox.style.fontSize = '20px';
        return displayBox;
    }
}
