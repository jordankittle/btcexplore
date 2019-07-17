function searchBlockPerHeight(height)
{
	console.log('Searching by block height');
	$.ajax({
		type: 'GET',
		url: 'https://blockstream.info/api/block-height/' + height,
		success: function(response){
			var data = response;
			console.log(data);
			showBlockByHash(data);
		},
		error: function(response){
			console.log(response);
		}
	});
}

function searchTxsPerHeight(height)
{
	console.log('Searching txs by block height');
	$.ajax({
		type: 'GET',
		url: 'https://blockstream.info/api/block-height/' + height,
		success: function(response){
			var data = response;
			console.log(data);
			showTxsByHash(data, height, 0);
		},
		error: function(response){
			console.log(response);
		}
	});
}

function clearBlocks()
{
	$("#blocks").empty();
}

function showBlockByHash(hash)
{
	console.log('Searching by block hash');
	$.ajax({
		type: 'GET',
		url: 'https://blockstream.info/api/block/' + hash,
		success: function(response){
			var data = response;
			console.log(data);
			$("#blocks").empty();


			
			var blockId = data.id;
			var blockHeight = data.height;
			var blockVersion = data.version;
			var blockTime = data.timestamp;
			var blockTxCount = data.tx_count;
			var blockSize = data.size;
			var blockWeight = data.weight;
			var blockMerkleRoot = data.merkle_root;
			var blockPreviousBlockhash = data.previousblockhash;
			var blockNonce = data.nonce;
			var blockbits = data.bits;
			var blockTimestamp = new Date(blockTime*1000).toLocaleString();

			$("#headertitle").html("Block: " + blockHeight);
			var string = "<div class='block' id='" + blockHeight + "'><span><a href='#' onClick='clearBlocks();searchTxsPerHeight(" + blockHeight + "); return false;'>Height: " + blockHeight  + "</span><span>" + blockTimestamp  + "</span><span>Tx: " + blockTxCount  + "</span><span>Size: " + blockSize/1000 + "KB</span></a><span><span><a href='#' onClick='showDetails(" + blockHeight + "); return false;'>Details<i class='ui-icon ui-icon-triangle-1-s toggle'></i><i class='ui-icon ui-icon-triangle-1-n toggle' style='display:none'></i></a></span><br><span style='padding:0' class='hide toggle'><span class='blocksmall'>Id: " + blockId + "</span><br><span class='blocksmall'>Merkle Root: " + blockMerkleRoot + "</span><br><span class='blocksmall'>Previous Hash : " + blockPreviousBlockhash + "</span><br><span class='blocksmall'>Version: " + blockVersion + "</span><span class='blocksmall'>Nonce: " + blockNonce + "</span><span class='blocksmall'>Bits : " + blockbits + "</span><br><span class='blocksmall'>Weight: " + blockWeight + "</span></span></div>";
			$("#blocks").append(string);
			

		},
		error: function(response){
			console.log(response);
		}
	});
}



function showTxsByHash(hash, height, startindex)
{
	console.log('showing addresses by hash at start index: ' + startindex);
	$.ajax({
		dataType: 'JSON',
		type: 'GET',
		url: 'https://blockstream.info/api/block/' + hash + '/txs/' + startindex,
		success: function(response){
			var data = response;
			console.log(response);
			//$("#blocks").empty();
			$("#headertitle").html("Transactions for block " + height);
			for (a=0; a<data.length; a++)
			{
				var txid = data[a].txid;
				var string = "<div class='block' id='" + txid + "'>" + (1+startindex+a) + ".)Tx ID: " + txid + "</div>";
				$("#blocks").append(string);
			}
			var newindex = startindex + 25;
			var string2 = "<div id='loadMore'><a href='#' onClick='showTxsByHash(\"" + hash + "\", " + height + ", " + newindex + ");return false'>Load More</a></div>"    
			$("#loadMore").remove(); 
			$("#blocks").append(string2);

		},
		error: function(response){
			console.log(response);
		}
	});
}

function getLatestBlockHeight()
{
	$.ajax({
		type: 'GET',
		url: 'https://blockstream.info/api/blocks/tip/height',
		success: function(response){
			var data = response;
			console.log('returning block height: ' + data);
			displayLatestBlocks(data);
		}
	});
}

function getBlocks()
{
	$.ajax({
		dataType: 'JSON',
		type: 'GET',
		url: 'https://blockstream.info/api/blocks',
		success: function(response){
			var data = response;
			console.log('returning 10 blocks ');
			return data;
		}
	});
}

function displayLatestBlocks(startheight)
{
	$.ajax({
		dataType: 'JSON',
		type: 'GET',
		url: 'https://blockstream.info/api/blocks/' + startheight,
		success: function(response){
			var data = response;
			console.log('displaying 10 blocks from height: ' + startheight);
			//$("#blocks").empty();
			$("#headertitle").html("Latest Blocks");
			for (a=0; a<data.length; a++)
			{
				var blockId = data[a].id;
				var blockHeight = data[a].height;
				var blockVersion = data[a].version;
				var blockTime = data[a].timestamp;
				var blockTxCount = data[a].tx_count;
				var blockSize = data[a].size;
				var blockWeight = data[a].weight;
				var blockMerkleRoot = data[a].merkle_root;
				var blockPreviousBlockhash = data[a].previousblockhash;
				var blockNonce = data[a].nonce;
				var blockbits = data[a].bits;
				var blockTimestamp = new Date(blockTime*1000).toLocaleString();

				var string = "<div class='block' id='" + blockHeight + "'><span><a href='#' onClick='clearBlocks();searchTxsPerHeight(" + blockHeight + "); return false;'>Height: " + blockHeight  + "</span><span>" + blockTimestamp  + "</span><span>Tx: " + blockTxCount  + "</span><span>Size: " + blockSize/1000 + "KB</span></a><span><span><a href='#' onClick='showDetails(" + blockHeight + "); return false;'>Details<i class='ui-icon ui-icon-triangle-1-s toggle'></i><i class='ui-icon ui-icon-triangle-1-n toggle' style='display:none'></i></a></span><br><span style='padding:0' class='hide toggle'><span class='blocksmall'>Id: " + blockId + "</span><br><span class='blocksmall'>Merkle Root: " + blockMerkleRoot + "</span><br><span class='blocksmall'>Previous Hash : " + blockPreviousBlockhash + "</span><br><span class='blocksmall'>Version: " + blockVersion + "</span><span class='blocksmall'>Nonce: " + blockNonce + "</span><span class='blocksmall'>Bits : " + blockbits + "</span><br><span class='blocksmall'>Weight: " + blockWeight + "</span></span></div>";
				$("#blocks").append(string);
				
			}
		var newheight = startheight - 10;
		var string2 = "<div id='loadMore'><a href='#' onClick='displayLatestBlocks(" + newheight + ");return false'>Load More</a></div>";
		$("#loadMore").remove();   
		$("#blocks").append(string2);
		
		}
	});
}

function showDetails(block)
{
	$("#" + block + " .toggle").toggle();
}



function searchBlocks(query)
{
	if(query.length < 16)
	{
		searchBlockPerHeight(query);
	}
	else
	{
		showBlockByHash(query);
	}

}


getLatestBlockHeight();