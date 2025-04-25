import jQuery from "jquery";

export function navigateTo(basePath : string, otherPath : string) {
    const urlFragment = basePath + "/" + otherPath
    jQuery.get("/partials/" + urlFragment, (data) => {
        document.getElementById("content")!.innerHTML = data
        const state = {
            basePath: basePath,
            otherPath: otherPath
        }
        history.pushState(state, "", "/" + urlFragment);
    })
}

export function navigateBack(event : PopStateEvent) {
    jQuery.get("/partials/" + event.state.basePath + "/" + event.state.otherPath, (data) => {
        document.getElementById("content")!.innerHTML = data
    })
}