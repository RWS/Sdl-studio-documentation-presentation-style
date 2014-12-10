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

    community.loadCommunityContent();

});


var community = function () {

    function getCommunityContent(communityContentPath) {
        $.ajax({
            url: communityContentPath,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/vnd.github.v3.raw');
            },
            success: function (data) {
                var content = md.toHtml(data);
                $('#community_content').html(content);
                setEditCommunity('edit');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                setEditCommunity('new');
            }
        });
    }

    function getNamespace() {
        var raw = $(".seeAlsoStyle:contains('Namespace')").text();
        var elements = raw.split(' ');
        if (elements.length == 0 || elements[0] == '') {
            //look at class name and see if we are actually on the namespace
            var raw = $('title').text();
            if (raw.indexOf('Namespace') == -1) return '';
            var namespace = raw.replace('Namespace', '').trim();
            return namespace;
        }

        return elements[0];
    };

    function getApi() {
        return $('#PageHeader').text().replace(/ /g, '');
    };

    function ensureClassName(className) {

        var elements = className.split('.');
        if (elements.length == 0 || elements[0] == '') return '';
        return elements[0];
    }

    function ensureFileName(className, type) {
        if (type == '') return className;
        return className + '.' + type;
    }

    function getClass() {
        var className = '';
        var type = '';
        var raw = $('title').text();

        var elements = raw.split(' ');
        if (elements.length == 0) return '';
        if (elements.length == 1) {
            className = elements[0];
        }
        if (elements.length > 1) {
            className = elements[0];
            type = elements[1];
        }

        //if the type is namespace it means we are on a namespace page and we don't have a class
        return {
            className: (type.indexOf('Namespace') > -1) ? '' : ensureClassName(className),
            fileName: ensureFileName(className, type)
        }
    }

    function buildGetContentUrl(api, namespace, className, fileName) {
        var githubCommunityRepository = 'https://api.github.com/repos/sdl/Community/contents/';
        if (api != '') {
            githubCommunityRepository += api;
        }
        if (namespace != '') {
            githubCommunityRepository += '/' + namespace;
        }
        if (className != '') {
            githubCommunityRepository += '/' + className;
        }

        return githubCommunityRepository + '/' + fileName + '.md';
    }

    function buildCommunityUrl(action, api, namespace, className, fileName) {
        var githubCommunityRepository = 'https://github.com/sdl/Community/' + action + '/master/';

        if (api != '') {
            githubCommunityRepository += api;
        }
        if (namespace != '') {
            githubCommunityRepository += '/' + namespace;
        }
        if (className != '') {
            githubCommunityRepository += '/' + className;
        }

        if (action == 'edit') {
            githubCommunityRepository += '/' + fileName + '.md';
        } else {
            githubCommunityRepository += '?filename=' + fileName + '.md';
        }

        return githubCommunityRepository;
    }

    function getContentPath() {
        var api = getApi();
        var namespace = getNamespace();
        var className = getClass();


        return {
            api: api,
            namespace: namespace,
            className: className.className,
            fileName: className.fileName
        }
    }

    function loadCommunityContent() {
        var contentPath = getContentPath();
        var communityContentPath = buildGetContentUrl(contentPath.api, contentPath.namespace, contentPath.className, contentPath.fileName);
        getCommunityContent(communityContentPath);

    };

    function setEditCommunity(action) {
        var contentPath = getContentPath();
        var communityContentPath = buildCommunityUrl(action, contentPath.api, contentPath.namespace, contentPath.className, contentPath.fileName);
        $('#community_edit').attr('href', communityContentPath);
        $('#community_content #community_edit').attr('href', communityContentPath);
    }

    return {
        loadCommunityContent: loadCommunityContent
    }
}();
