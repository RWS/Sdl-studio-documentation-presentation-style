var md = function () {
    marked.setOptions({
        gfm: true,
        pedantica: false,
        sanitize: true,
        highlight: function (code, lang) {
            if (lang != undefined) {
                return hljs.highlight(lang, code).value;
            }

            return hljs.highlight(code).value;
        }
    });
    var toHtml = function (markdown) {
        if (markdown == undefined) return '';
        return marked(markdown);
    }

    hljs.tabReplace = '    ';
    return {
        toHtml: toHtml
    }
}();
$(document).ready(function () {

    $.ajax({
        url: 'https://api.github.com/repos/sdl/Community/contents/test.md',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/vnd.github.v3.raw');
        },
        success: function (data) {
            var content = md.toHtml(data);
            $('#community_content').html(content);

        }
    });
});
