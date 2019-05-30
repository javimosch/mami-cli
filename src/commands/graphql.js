export function generateGraphqlDocs(){
	let port = process.env.PORT || '3000'
	let cmd = `graphdoc -e http://localhost:${port}/graphql -o ./docs/graphql/schema`
}