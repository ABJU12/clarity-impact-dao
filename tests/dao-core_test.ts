import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Can join DAO",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    
    let block = chain.mineBlock([
      Tx.contractCall("dao-core", "join-dao", [], wallet_1.address)
    ]);
    
    assertEquals(block.receipts[0].result, "(ok true)");
  },
});

Clarinet.test({
  name: "Cannot join DAO twice", 
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    
    let block = chain.mineBlock([
      Tx.contractCall("dao-core", "join-dao", [], wallet_1.address),
      Tx.contractCall("dao-core", "join-dao", [], wallet_1.address)
    ]);
    
    assertEquals(block.receipts[1].result, "(err u101)");
  },
});
