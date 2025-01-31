;; DAO Governance Token Contract

(define-fungible-token dao-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant token-name "ImpactDAO Token")
(define-constant token-symbol "IMPACT")

;; Mint tokens
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ft-mint? dao-token amount recipient)))
    
;; Transfer tokens
(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (begin 
    (asserts! (is-eq tx-sender sender) (err u403))
    (ft-transfer? dao-token amount sender recipient)))
