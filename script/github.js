function GetCommit(user, sha, callback)
{
	const commitUrl = `https://api.github.com/repos/${user}/commits/${sha}`
	var xmlHttp = new XMLHttpRequest()
	xmlHttp.onload = function()
	{
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		callback(JSON.parse(xmlHttp.responseText))
	}
	xmlHttp.open('GET', commitUrl, true)
	xmlHttp.send(null)
}