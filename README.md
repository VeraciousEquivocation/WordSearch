# WordSearch

An interesting way to search for the number of occurrences of a word in a nested array of letters.
only left to right. top to bottom, and left to right diagonals.

the only method that counts, is checkRows.

Instead of checking every letter, and searching for all occurrences, this uses a regex on each row joined into a single string.
But what might be really unique, is that this just flips the board, and makes 3 additional boards to search rows through.

For example, you can grab all diag rows from left to right, then flip the board so columns are now rows, and then grab diagonals from left to right again, and merge the two and you'll have all the diagonals as individual rows.

a way to make this more efficient, might be to only flip the board once, and use that the two times it's needed.
