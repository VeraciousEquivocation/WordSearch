let board = [
    ['c','c','a','t','e','c'],
    ['f','a','c','c','t','a'],
    ['c','a','t','a','a','t'],
    ['c','c','t','c','t','c'],
    ['c','a','t','a','a','a'],
    ['c','t','t','a','t','t'],
]

let word = 'cat'

let board2 = [
    ['a','a','a','t','e','c'],
]
let word2 = 'aa'

let board3 = [
    'aaaaaafdsfdsfaaafdsfdsfdsaaaaafdsfdsfaaaa'.split('')
]
let word3 = 'aaa'

let board4 = [
    'popopfdsfspopfdsfdspopop'.split('')
]
let word4 = 'pop'

let board5 = [
    ['c','c','a','t','e','c'],
    ['f','a','c','c','t','a'],
    ['c','a','t','a','a','t'],
    ['c','c','t','c','t','c'],
    ['c','a','t','a','a','a'],
    ['c','t','t','a','t','t'],
]

let word5 = 'c'

let board6 = [
    ['a','a'],
    ['a','a'],
]

let word6 = 'aa'

/**
 * Method to count total times word shows up in board, →,↓,⭨
 * @param {*} board 
 * @param {*} word 
 * @returns 
 */
var countTtlWords = (board,word) => {

    if(!word || word.trim() ==='') {
        console.log(`no word was provided`)
        return
    }

    let rowCnt = checkRows(board,word)
    let colCnt = checkCols(board,word)
    let diagCnt = checkDiags(board,word)
    let ttl = rowCnt + colCnt + diagCnt

    console.log(`TOTAL TIMES ${word} WAS FOUND: ${ttl}`)
}

/**
 * count total time word shows up in diagonal rows.
 * gets top left to right diags, and then flips board
 * and gets the remaining diags, merge and passes to checkRows
 * @param {*} board 
 * @param {*} word 
 * @returns 
 */
function checkDiags(board,word) {
    if(board.length === 1) return 0

    let left = buildDiagRowsLeftToRight(board,word)

    let flipIt = flipBoard(board,word)

    let right = buildDiagRowsLeftToRight(flipIt,word)

    right.shift()

    let diagRows = [...left,...right]

    let ttl = checkRows(diagRows,word)

    return ttl
}

/**
 * Start top left, go right, and build out diagonals as rows
 * @param {*} board 
 * @param {*} word 
 * @returns 
 */
function buildDiagRowsLeftToRight(board,word) {
    let diagBoard = []
    let maxIdx = board[0].length - word.length
    let maxdownRows = board.length - word.length
    let ttlRows = maxdownRows + (maxIdx + 1)
    
    for(let y = 0; y<(maxIdx+1); y++) {
        diagBoard.push([])
    }

    board[0].forEach((ltr,idx) => {
        if(idx > maxIdx) return;
        let r = 0;
        for(let j=idx; j<board[0].length; j++) {
            diagBoard[idx].push(board[r][j])
            r++
        }
    })

    return diagBoard
}

/**
 * Counts total time word is found in supplied board rows, left to right
 * @param {*} board 
 * @param {*} word 
 * @returns 
 */
function checkRows(board, word){
    // For each row find word matches. 

    // Word match counter.
    let cnt = 0;

    board.forEach((row)=>{
        // this won't catch overlapping words like aa in aaa
        // row.join("").split(word).length - 1
        
        let re;

        re = `(?=(${word}))`

        let finds = row.join("").match(new RegExp(re,"g"))
        if (finds) {
            cnt += finds.length
        }
    })

    // Return the count. 
    return cnt; 
}

/**
 * passes a flipped board to check rows, to count total in columns
 * @param {*} board 
 * @param {*} word 
 * @returns 
 */
var checkCols = (board,word) => {
    let cnt = 0

    let flipped = flipBoard(board)

    return checkRows(flipped,word)
}

var flipBoard = (brd) => {
    const ttlRows = brd[0].length

    let flippedBrd = []

    // DON'T USE .fill(), IT FILLS WITH A REFERNCE TO A SINGLE INSTANCE

    for(let y = 0; y<ttlRows; y++) {
        flippedBrd.push([])
    }

    brd.forEach((row,idx)=>{
        row.forEach((letter,idk) => {
            flippedBrd[idk].push(letter)
        })
    })

    return flippedBrd
}

countTtlWords(board,word)
countTtlWords(board2,word2)
countTtlWords(board3,word3)
countTtlWords(board4,word4)
countTtlWords(board5,word5)
countTtlWords(board6,word6)
