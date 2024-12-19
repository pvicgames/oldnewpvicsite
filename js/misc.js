function getCurrentPage() {
    const currPage = window.location.pathname.split('/').pop() || 'index.html'
    return currPage
}